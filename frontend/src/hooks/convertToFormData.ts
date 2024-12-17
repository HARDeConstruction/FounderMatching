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
      } else if (typeof value === "object" && !(value instanceof File)) {
        Object.keys(value).forEach((subKey) => {
          formData.append(`${key}[${subKey}]`, value[subKey]);
        });
      } else {
        formData.append(key, value);
      }
    });
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }    
    if (formData.get("avatar")) {
      console.log("Avatar File:", formData.get("avatar"));
    }
    
    return formData;
};
  