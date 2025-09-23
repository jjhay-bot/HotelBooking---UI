import { snakeCase } from "lodash";
import { useState } from "react";

const useForm = (initialValues = {}, { onSubmit = () => { }, required = [] }) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e, newValue) => {
    // Autocomplete case (string-based name and value)
    if (typeof e === "string") {
      const name = e;
      setFormData((prev) => ({ ...prev, [snakeCase(name)]: newValue }));
      return;
    }

    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [snakeCase(name)]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔑 Run validation
    const validationPassed = validate();

    if (!validationPassed) {
      // Validation failed, don't submit
      return;
    } else {
      // Validation passed, proceed with submission
      onSubmit(formData);
    }
  };

  const validate = () => {
    const newErrors = {};
    required.forEach((field) => {
      const fieldValue = formData[field] || formData[snakeCase(field)];
      if (!fieldValue || fieldValue.trim() === "") {
        console.log("Missing field:", field, "value:", fieldValue);
        newErrors[field] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    setFormData, // optional: for manual override
    errors,
  };
};

export default useForm;
