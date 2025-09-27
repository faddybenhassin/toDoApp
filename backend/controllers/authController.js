import path from "path"
import bcrypt from "bcrypt"
import { promises as fsPromises } from 'fs';



const usersDB = {
    users: require("../models/users.json"),
    setUsers: function(data){ this.user = data}
}




export async function register(req,res) {
    
}

export async function login(req,res) {
    
}