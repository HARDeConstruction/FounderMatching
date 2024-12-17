export const convertToFormData = (data: any) => {
    const formData = new FormData();
  
    Object.keys(data).forEach((key) => {
      const value = data[key];
  
      if (value === null || value === undefined) return;
  
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          Object.keys(item).forEach((subKey) => {
            formData.append(`${key}[${index}][${subKey}]`, item[subKey]);
          });
        });
      } else if (key === "Avatar" && value instanceof File) {
        formData.append("Avatar", value);
      } else {
        formData.append(key, value);
      }
    });
  
    return formData;
};
  