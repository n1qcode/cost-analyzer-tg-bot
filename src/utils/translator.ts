const translator = (w: string) => {
  switch (w) {
    case "cat_products":
      return "Продукты";
    case "cat_food_delivery":
      return "Доставка еды";
    case "cat_shit_food":
      return "Вредная еда";
    case "cat_cafes":
      return "Кафе / рестораны";
    default:
      return w;
  }
};

export default translator;
