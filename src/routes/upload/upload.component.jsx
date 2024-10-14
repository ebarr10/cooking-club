import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  uploadImage,
  addCollectionAndDocument,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import "./upload.styles.scss";

const defaultFormFields = {
  title: "",
  name: "",
};

const acceptedFileTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

function Upload() {
  const { id, theme } = useParams();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, name } = formFields;
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const formRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  function resetFormFields() {
    setFormFields(defaultFormFields);
    setFile(null);
    formRef.current.reset();
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Validate file type
      if (acceptedFileTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setErrorMessage(""); // Clear any previous error messages
      } else {
        setFile(null);
        formRef.current.reset();
        setErrorMessage(
          "Please select a valid image file. (jpg, jpeg, png, gif)"
        );
      }
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setUploading(true);
    try {
      // Upload Image
      const downloadUrl = await uploadImage(file);

      // Create new Entry
      const newEntry = {
        timestamp: new Date(),
        week: id,
        title: title,
        img: downloadUrl,
        user: name,
      };

      // Upload new Entry into Firestore
      await addCollectionAndDocument("food", newEntry);

      resetFormFields();
    } catch {
      setErrorMessage("Failed to upload file or save data");
    } finally {
      setUploading(false);

      // Navigate back to week/:id/:theme + clear input
      navigate(`/week/${id}/${theme}`);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <div>
      <span className="upload-title">
        Week {id} Upload: <u>{theme}</u>
      </span>
      <div className="upload-container">
        <form ref={formRef} onSubmit={handleSubmit}>
          <FormInput
            label="Title of Meal"
            type="text"
            required
            onChange={handleChange}
            name="title"
            value={title}
          />

          <input
            label="Image"
            type="file"
            required
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />

          <FormInput
            label="Provide Your Name"
            type="text"
            required
            onChange={handleChange}
            name="name"
            value={name}
          />

          <div className="buttons-container" disabled={uploading}>
            <Button type="submit">
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Upload;
