const { Collection, Item, Header } = require("postman-collection");
const fs = require("fs");

// create collection
const postmanCollection = new Collection({
  info: {
    name: "Dokumentasi API",
  },
  item: [],
});

//register user
const postmanRequestRegister = new Item({
  name: "Register endpoint",
  request: {
    header: {
      "Content-type": "application/json",
    },
    url: "http://localhost:3000/auth/register",
    method: "POST",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        username: "username",
        email: "email@gmail.com",
        password: "password123",
      }),
    },
    auth: null,
  },
});

//login user
const postmanRequestLogin = new Item({
    name: "Login endpoint",
    request: {
        header: {
            "Content-type": "application/json",
        },
        url: "http://localhost:3000/auth/login",
        method: "POST",
        body: {
            mode: "raw",
            raw: JSON.stringify({
                username: "username",
                password: "password123",
            }),
        },
        auth: null,
    },
});

//change password
const postmanRequestChangePassword = new Item({
    name: "Change Password endpoint",
    request: {
        header: {
            "Content-type": "application/json",
            "Authorization": "{{token}}"
        },
        url: "http://localhost:3000/auth/changePassword",
        method: "PUT",
        body: {
            mode: "raw",
            raw: JSON.stringify({
                oldPassword: "password123",
                newPassword: "password1234",
                confirmNewPassword: "password1234",
            }),
        },
        auth: null,
    },
});

//delete account
const postmanRequestDeleteAccount = new Item({
    name: "Delete Account endpoint",
    request: {
        header: {
            "Content-type": "application/json",
            "Authorization": "{{token}}"
        },
        url: "http://localhost:3000/auth/deleteAccount",
        method: "DELETE"
        auth: null,
    },
});

//add biodata
const postmanRequestAddBiodata = new Item({
    name: "Add Biodata endpoint",
    request: {
        header: {
            "Content-type": "application/json",
            "Authorization": "{{token}}"
        },
        url: "http://localhost:3000/biodata",
        method: "POST",
        body: {
            mode: "raw",
             raw: JSON.stringify({
                "fullname":"John Doe", 
                "dob":"2000-12-25",
                "phone":"08212345678", 
                "gender":"male",
                "address":"Jl. Basuki Rahmat 60a"
            }),
        },
        auth: null,
    },
});

//edit biodata
const postmanRequestEditBiodata = new Item({
    name: "Edit Biodata endpoint",
    request: {
        header: {
            "Content-type": "application/json",
            "Authorization": "{{token}}"
        },
        url: "http://localhost:3000/biodata",
        method: "PUT",
        body: {
            mode: "raw",
            raw: JSON.stringify({
                "fullname":"John Connor", 
                "dob":"1997-12-25",
                "phone":"08212345678", 
                "gender":"male",
                "address":"Jl. Basuki Rahmat 60a"
            }),
        },
        auth: null,
    },
});  

//get biodata
const postmanRequestGetBiodata = new Item({
    name: "Get Biodata endpoint",
    request: {
        header: {
            "Content-type": "application/json",
            "Authorization": "{{token}}"
        },
        url: "http://localhost:3000/biodata",
        method: "GET",
        auth: null,
    },
});

//add history
const postmanRequestAddHistory = new Item({
    name: "Add History endpoint",
    request: {
        header: {
            "Content-type": "application/json",
            "Authorization": "{{token}}"
        },
        url: "http://localhost:3000/history",
        method: "POST",
        body: {
            mode: "raw",
            raw: JSON.stringify({
                "title": "History 1",
                "description": "History 1 description",
                "date": "2020-12-25"
            }),
        },
        auth: null,
    },
});

//get history biodata by user logged in
const postmanRequestGetHistoryBiodataByUserLoggedIn = new Item({
    name: "Get History endpoint",
    request: {
        header: {
            "Content-type": "application/json",
            "Authorization": "{{token}}"
        },
        url: "http://localhost:3000/detail",
        method: "GET",
        auth: null,
    },
});

//admin login
const postmanRequestAdminLogin = new Item({
    name: "Admin Login endpoint",
    request: {
        header: {
            "Content-type": "application/json",
        },
        url: "http://localhost:3000/admin/login",
        method: "POST",
        body: {
            mode: "raw",
            raw: JSON.stringify({
                username: "admin",
                password: "admin123",
            }),
        },
        auth: null,
    },
});

//get all user detail must admin
const postmanRequestGetAllUserDetailMustAdmin = new Item({
    name: "Get All User Detail endpoint",
    request: {
        header: {
            "Content-type": "application/json",
            "Authorization": "{{token}}"
        },
        url: "http://localhost:3000/admin/getAllUserDetail/",
        method: "GET",
        auth: null,
    },
});

//get user detail by id must admin
const postmanRequestGetUserDetailByIdMustAdmin = new Item({
    name: "Get User Detail By Id endpoint",
    request: {
        header: {
            "Content-type": "application/json",
            "Authorization": "{{token}}"
        },
        url: "http://localhost:3000/admin/getUserDetailById/1",
        method: "GET",
        auth: null,
    },
});

//items add
postmanCollection.items.add(postmanRequestRegister);
postmanCollection.items.add(postmanRequestLogin);
postmanCollection.items.add(postmanRequestChangePassword);
postmanCollection.items.add(postmanRequestDeleteAccount);
postmanCollection.items.add(postmanRequestAddBiodata);
postmanCollection.items.add(postmanRequestEditBiodata);
postmanCollection.items.add(postmanRequestGetBiodata);
postmanCollection.items.add(postmanRequestAddHistory);
postmanCollection.items.add(postmanRequestGetHistoryBiodataByUserLoggedIn);
postmanCollection.items.add(postmanRequestAdminLogin);
postmanCollection.items.add(postmanRequestGetAllUserDetailMustAdmin);
postmanCollection.items.add(postmanRequestGetUserDetailByIdMustAdmin);

// convert to json
const collectionJSON = postmanCollection.toJSON();

//export to file
fs.writeFile("./collection.json", JSON.stringify(collectionJSON), (err) => {
  if (err) console.log(err);
  console.log("file saved");
});



