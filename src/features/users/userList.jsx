import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";

 const UserList=()=>{
    const users=useSelector(selectAllUsers)

    const renderedUsers=users.map(user=>{
        return (
            <li key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
            </li>
        )
    })

    return(
        <section>
            <h2>用户列表</h2>
            <ul>{renderedUsers}</ul>
        </section>
    )
}

export default UserList