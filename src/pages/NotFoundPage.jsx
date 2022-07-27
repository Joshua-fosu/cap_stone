import React from "react";
import UserProfileSkeleton from "../components/SkeletonLoaders/UserProfileSkeleton";
import UserChatSkeleton from "../components/SkeletonLoaders/UserChatSkeleton";

export default function NotFoundPage() {
  return (
    <>
      <UserChatSkeleton />
    </>
  );
}
