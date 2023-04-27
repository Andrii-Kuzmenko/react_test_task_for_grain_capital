import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import * as selectedUsersActions from '../../features/selectedUser/selectedUserSlice';
import * as usersActions from '../../features/users/usersSlice';
import * as modalActions from '../../features/modal/modalSlice';

import { NewUserForm } from "../NewUserForm/NewUserForm";
import './UserPage.scss';

export const UserPage = () => {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector(state => state.selectedUser);
  const { users } = useAppSelector(state => state.users);
  const modal = useAppSelector(state => state.modal);
  const { userId = '' } = useParams();

  const user = useMemo(() => users.find(u => u.id === +userId), [userId, users]);

  useEffect(() => {
    if (user) {
      dispatch(selectedUsersActions.setUser(user));
    }
  }, [user])

  const index = useMemo(() => {
    if (!selectedUser) {
      return 0;
    }

    return users.findIndex(user => user.id === selectedUser.id);
  }, [users, selectedUser])


  const nextUser = useMemo(() => {
    if (index + 1 > users.length - 1) {
      return users[0];
    }

    return users[index + 1];
  }, [users, selectedUser])

  const prevUser = useMemo(() => {
    if (index - 1 < 0) {
      return users[users.length - 1];
    }

    return users[index - 1];
  }, [users, selectedUser])

  return (
    <div>
      {!user && <h1>User not found</h1>}
      
      {selectedUser && selectedUser.id === +userId &&
        <>
          <div className="user">
            <h2>User Info</h2>
            <div>
              <div className="user__detail-row">
                <span className="user__label">Name:</span>
                <span className="user__value">{selectedUser.name}</span>
              </div>
              <div className="user__detail-row">
                <span className="user__label">Username:</span>
                <span className="user__value">{selectedUser.username}</span>
              </div>
              <div className="user__detail-row">
                <span className="user__label">Email:</span>
                <span className="user__value">{selectedUser.email}</span>
              </div>
              <div className="user__detail-row">
                <span className="user__label">Phone:</span>
                <span className="user__value">{selectedUser.phone}</span>
              </div>
              <div className="user__detail-row">
                <span className="user__label">Website:</span>
                <span className="user__value">{selectedUser.website}</span>
              </div>
              <div className="user__detail-row">
                <span className="user__label">Address</span>
                <div className="user__details">
                  <div className="user__detail-row">
                    <span className="user__label">Street:</span>
                    <span className="user__value">{selectedUser.address.street}</span>
                  </div>
                  <div className="user__detail-row">
                    <span className="user__label">Suite:</span>
                    <span className="user__value">{selectedUser.address.suite}</span>
                  </div>
                  <div className="user__detail-row">
                    <span className="user__label">City:</span>
                    <span className="user__value">{selectedUser.address.city}</span>
                  </div>
                  <div className="user__detail-row">
                    <span className="user__label">Zipcode:</span>
                    <span className="user__value">{selectedUser.address.zipcode}</span>
                  </div>
                  <div className="user__detail-row">
                    <span className="user__label">Geo lat:</span>
                    <span className="user__value">{selectedUser.address.geo.lat}</span>
                  </div>
                  <div className="user__detail-row">
                    <span className="user__label">Geo lng:</span>
                    <span className="user__value">{selectedUser.address.geo.lng}</span>
                  </div>
                </div>
              </div>
              <div className="user__detail-row">
                <span className="user__label">Company</span>
                <div className="user__details">
                  <div className="user__detail-row">
                    <span className="user__label">Name:</span>
                    <span className="user__value">{selectedUser.company.name}</span>
                  </div>
                  <div className="user__detail-row">
                    <span className="user__label">Catchphrase:</span>
                    <span className="user__value">{selectedUser.company.catchPhrase}</span>
                  </div>
                  <div className="user__detail-row">
                    <span className="user__label">Bs:</span>
                    <span className="user__value">{selectedUser.company.bs}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="user__controls">
            <Link
              className="user__link"
              to={`/users/${prevUser.id}`}
            >
              <button type="button" className="user__button">
                prev
              </button>
            </Link>

            <button 
              type="button"
              className="user__button"
              onClick={() => dispatch(modalActions.setModal(true))}
            >
              Update user
            </button>

            {modal && 
              <NewUserForm 
                action={usersActions.update}
                user={selectedUser}
              />
            }

            <Link 
              className="user__link"
              to={`/users/${nextUser.id}`}
            >
              <button type="button" className="user__button">
                next
              </button>
            </Link>
          </div>
        </>
      }
    </div>
  )
}
