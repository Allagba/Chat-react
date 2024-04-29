import "./AddUser.css";
const AddUser = () => {
  return (
    <div className="adduser">
      <input type="text" name="username" id="" placeholder="Username" />
      <button>Search</button>
      <form action=""></form>
      <div className="user">
        <div className="detail">
          <img src="./avatar.png" alt="" />
          <span>Jane Doe</span>
        </div>
        <button>Add User</button>
      </div>
    </div>
  );
};

export default AddUser;
