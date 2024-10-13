import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import "./upload.styles.scss";

const defaultFormFields = {
  title: "",
  name: "",
};

const acceptedFileTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

function Upload() {
  const { id } = useParams();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, name } = formFields;
  const [file, setFile] = useState(null);
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

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submitting");

    // Navigate back to week/:id + clear input
    resetFormFields();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <div>
      <h1>Week {id} Upload</h1>
      <div className="upload-container">
        <form ref={formRef} onSubmit={handleSubmit}>
          <FormInput
            label="Name of Meal"
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
            label="Who is Uploading"
            type="text"
            required
            onChange={handleChange}
            name="name"
            value={name}
          />

          <div className="buttons-container">
            <Button type="submit">Upload</Button>
          </div>
        </form>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Upload;