function getNickName(province) {
  switch (province) {
    case "Cordoba":
      return "COR";
      break;
    case "Buenos Aires":
      return "EZE";
      break;
    case "Santa Fe":
      return "SFE";
      break;
    case "Entre Ríos":
      return "ERT";
      break;
    case "Tucuman":
      return "TUC";
      break;
    case "Mendoza":
      return "MDZ";
      break;
    case "Salta":
      return "SLA";
      break;
    case "Jujuy":
      return "JUJ";
      break;
    case "Rio Negro":
      return "RNG";
      break;
    case "Formosa":
      return "FMA";
      break;
    case "San Juan":
      return "SJU";
      break;
    case "Corrientes":
      return "CNES";
      break;
    case "Neuquen":
      return "NEU";
      break;
    case "La Pampa":
      return "LPA";
      break;
    case "Tierra del Fuego":
      return "TDF";
      break;
    case "San Luis":
      return "SLU";
      break;
    case "Chubut":
      return "CHU";
      break;
    case "Santiago del Estero":
      return "SGO";
      break;
    default:
      break;
  }
}
module.exports = { getNickName };
