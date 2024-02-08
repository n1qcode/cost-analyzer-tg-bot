const monthConvertor = (month: number) => {
  return month < 0 ? "12" : String(month + 1).padStart(2, "0");
};

export default monthConvertor;
