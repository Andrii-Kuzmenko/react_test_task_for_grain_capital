import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import * as usersActions from '../../features/users/usersSlice';
import * as selectedUsersActions from '../../features/selectedUser/selectedUserSlice';
import * as modalActions from '../../features/modal/modalSlice';
import './UsersPage.scss';
import { Link } from "react-router-dom";
import { SearchForm } from "../SearchForm/SearchForm";
import { NewUserForm } from "../NewUserForm/NewUserForm";
import classNames from "classnames";

export const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.users);
  const modal = useAppSelector(state => state.modal);
  const searchQuery = useAppSelector(state => state.searchQuery);

  const filteredUsers = useMemo(() => users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
    || user.username.toLowerCase().includes(searchQuery.toLowerCase())),
  [users, searchQuery]);

  return (
    <div className="users">
      <div className="users__searchForm searchForm">
        <SearchForm />
        
        {!filteredUsers.length && !!users.length && (
          <p className="searchForm__error">
            The user with such a name is not on the list
          </p>
        )}
      </div>

      {!!filteredUsers.length && !!users.length &&
        <table className="table">
          <thead>
            <tr>
              <th className="table__cell table__head">id</th>
              <th className="table__cell table__head">name</th>
              <th className="table__cell table__head">username</th>
              <th className="table__cell table__head"></th>
            </tr>
          </thead>
          <tbody className="table__body">
            {filteredUsers.map(user => (
            <tr key={user.id}>
              <td className="table__cell">{user.id}</td>
              <td className="table__cell table__link-container">
                <Link 
                  className={classNames(
                    'table__link', 
                    {'table__link--updated': user.isUpdated}
                  )}
                  to={`${user.id}`}
                  onClick={() => dispatch(selectedUsersActions.setUser(user))}
                >
                {user.name}
                </Link>
              </td>
              <td className="table__cell">{user.username}</td>
              <td 
                className='table__cell table__icon'
                  onClick={() => dispatch(usersActions.remove(user.id))}
              ></td>
            </tr>
            ))}
          </tbody>
        </table>}

      <div className="table__controls">
        <button 
          type="button"
          className="table__button"
          onClick={() => dispatch(modalActions.setModal(true))}
        >
          Add User
        </button>
      </div>

      {modal && <NewUserForm action={usersActions.add} />}
    </div>
  )
}
