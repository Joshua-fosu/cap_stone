import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import { useUserData } from "../../contexts/UserDataContext";

export default function UserStatDisplayCarousel() {
  const [userStatuses, setUserStatuses] = useState([]);
  const { userDetails } = useUserData();

  useEffect(() => {
    const q = query(collection(database, "statuses"), where("id", ">", ""));
    let interArr = [];
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        interArr.push(doc.data());
      });
      setUserStatuses(interArr);
    });
  }, []);

  return (
    <>
      {userStatuses?.length !== 0 ? (
        <>
          <Carousel controls={false} indicators={false}>
            {userStatuses?.length !== 0 ? (
              userStatuses.map((eachStat) => (
                <Carousel.Item interval={5000}>
                  <img
                    className="d-block w-100"
                    src={eachStat?.image}
                    alt="First slide"
                    style={{ minHeight: "350px" }}
                  />
                  <Carousel.Caption>
                    <p>{eachStat?.name}</p>
                  </Carousel.Caption>
                  <p className="text-muted">
                    {eachStat?.owner === userDetails?.userName
                      ? "You"
                      : eachStat?.owner}
                    {" has "}
                    this event saved
                  </p>
                </Carousel.Item>
              ))
            ) : (
              <></>
            )}
          </Carousel>
        </>
      ) : (
        <p>There are no saved </p>
      )}
    </>
  );
}
