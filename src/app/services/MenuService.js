import axios from "axios";
import ConstantList from "../appConfig";
class MenuService {
  async getListMenuItem (){
    let url = ConstantList.API_ENDPOINT + "/api/menuitem/getallroot";
    return await axios.get(url);
  };

  async getAllMenuItemByRoleList (){
    var url = ConstantList.API_ENDPOINT + "/api/menuitem/getmenubyuser";
    return axios.get(url);
  };
}

export default new MenuService();
