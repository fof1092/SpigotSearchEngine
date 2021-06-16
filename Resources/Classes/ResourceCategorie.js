class ResourceCategorie {
  constructor(categorieIDObj) {
    this.id = categorieIDObj;
  }

  getID() {
    return this.id;
  }

  getName() {
    switch (this.id) {
      case 2:
        return "Bungeecord - Spigot";
        break;
      case 5:
        return "(Bungeecord - Spigot) Transportation";
        break;
      case 6:
        return "(Bungeecord - Spigot) Chat";
        break;
      case 7:
        return "(Bungeecord - Spigot) Tools and Utilities";
        break;
      case 8:
        return "(Bungeecord - Spigot) Misc";
        break;
      case 3:
        return "Bungeecord";
        break;
      case 9:
        return "(Bungeecord) Libraries / APIs";
        break;
      case 10:
        return "(Bungeecord) Transportation";
        break;
      case 11:
        return "(Bungeecord) Chat";
        break;
      case 12:
        return "(Bungeecord) Tools and Utilities";
        break;
      case 13:
        return "(Bungeecord) Misc";
        break;
      case 4:
        return "Spigot";
        break;
      case 14:
        return "(Spigot) Chat";
        break;
      case 15:
        return "(Spigot) Tools and Utilities";
        break;
      case 16:
        return "(Spigot) Misc";
        break;
      case 17:
        return "(Spigot) Fun";
        break;
      case 18:
        return "(Spigot) World Management";
        break;
      case 22:
        return "(Spigot) Mechanics";
        break;
      case 23:
        return "(Spigot) Economy";
        break;
      case 24:
        return "(Spigot) Game Mode";
        break;
      case 25:
        return "Skript";
        break;
      case 26:
        return "(Spigot) Libraries / APIs";
        break;
      case 19:
        return "Standalone";
        break;
      case 20:
        return "Paid Plugin";
        break;
      case 21:
        return "Universal";
        break;
      case 27:
        return "Web";
        break;
      default:
        return null;
        break;
    }
  }

  getHTML() {
    return (
      ', <a href="resources/categories/' +
      this.getID() +
      '">' +
      this.getName() +
      "</a>"
    );
  }
}
