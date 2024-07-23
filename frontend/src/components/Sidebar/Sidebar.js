"use client";
import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import url from "@/utils/urls";
import UserSkeleton from "../skeletons/UserSkeleton";

export default function Sidebar() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${url}/api/conversations/users`, { withCredentials: true }).then((response) => {
      setUsers(response.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(true);
    });
  }, []);

  return (
    <div className="h-screen overflow-y-auto flex flex-col p-3 border-r-2 min-w-52">
      {loading ? <div className="flex flex-col gap-3">
        <UserSkeleton></UserSkeleton>
        <UserSkeleton></UserSkeleton>
        <UserSkeleton></UserSkeleton>
      </div> : users.map((user) => {
        return <UserCard key={user._id} conversationId={user._id} displayName={user.displayName} profileUrl={user.profileUrl}></UserCard>
      })}
    </div>
  )
}