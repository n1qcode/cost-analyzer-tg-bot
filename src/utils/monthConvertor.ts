const monthConvertor = (month: number) => {
  return String(month + 1).padStart(2, "0");
};

export default monthConvertor;
