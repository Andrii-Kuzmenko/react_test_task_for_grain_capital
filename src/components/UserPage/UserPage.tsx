import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import * as selectedUsersActions from '../../features/selectedUser/selectedUserSlice';
import * as usersActions from '../../features/users/usersSlice';
import * as modalActions from '../../features/modal/modalSlice';

import './UserPage.scss';
import { useMemo } from "react";
import { NewUserForm } from "../NewUserForm/NewUserForm";

export const UserPage = () => {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector(state => state.selectedUser);
  const { users } = useAppSelector(state => state.users);
  const modal = useAppSelector(state => state.modal);
  const { userId = '' } = useParams();

  
  const nextUser = useMemo(() => {
    if (!selectedUser) {
      return users[0];
    }
    const index = users.findIndex(user => user.id === selectedUser.id);

    if (index + 1 > users.length - 1) {
      return users[0];
    }

    return users[index + 1];
  }, [users, selectedUser])

  const prevUser = useMemo(() => {
    if (!selectedUser) {
      return users[0];
    }
    const index = users.findIndex(user => user.id === selectedUser.id);

    if (index - 1 < 0) {
      return users[users.length - 1];
    }

    return users[index - 1];
  }, [users, selectedUser])

  return (
    <>
      {selectedUser && 
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
        </div>}
        {selectedUser?.id &&
          <div className="user__controls">
            <Link
              className="user__link"
              to={`/users/${prevUser.id}`}
              onClick={() => dispatch(selectedUsersActions.setUser(prevUser))}
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
              onClick={() => dispatch(selectedUsersActions.setUser(nextUser))}
            >
              <button type="button" className="user__button">
                next
              </button>
            </Link>
          </div>
        }
    </>
  )
}
