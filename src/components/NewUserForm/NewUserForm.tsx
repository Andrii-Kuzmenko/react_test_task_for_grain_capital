import React, { useMemo } from "react";
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import './NewUserForm.scss';
import { User } from "../../types/User";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit/dist/createAction";
import * as selectedUsersActions from '../../features/selectedUser/selectedUserSlice';
import * as modalActions from '../../features/modal/modalSlice';
import { SingleInput } from "../SingleInput/SingleInput";


type Props = {
  action: ActionCreatorWithPayload<User, "users/add"> 
    | ActionCreatorWithPayload<User, "users/update">
  user?: User;
}

export const NewUserForm = React.memo<Props>(({action, user}) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.users);

  const maxId = useMemo(() => {
    if (!users.length) {
      return 1;
    }

    return Math.max(...users.map(user => user.id));
  }, [users])

  const init = {
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    street: user?.address.street || '',
    suite: user?.address.suite || '',
    city: user?.address.city || '',
    zipcode: user?.address.zipcode || '',
    geoLat: user?.address.geo.lat || '',
    geoLng: user?.address.geo.lng || '',
    phone: user?.phone || '',
    website: user?.website || '',
    companyName: user?.company.name || '',
    catchPhrase: user?.company.catchPhrase || '',
    companyBs: user?.company.bs || '',
  }

  const [{ 
    name, 
    username, 
    email, 
    street,
    suite,
    city,
    zipcode,
    geoLat,
    geoLng,
    phone,
    website,
    companyName,
    catchPhrase,
    companyBs,
  }, setValues] = useState(init);

  const [errors, setErrors] = useState({
    name: false,
    username: false,
    email: false,
    street: false,
    suite: false,
    city: false,
    zipcode: false,
    geoLat: false,
    geoLng: false,
    phone: false,
    website: false,
    companyName: false,
    catchPhrase: false,
    companyBs: false,
  });

  const clearForm = () => {
    setValues({
      name: '',
      username: '',
      email: '',
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geoLat: '',
      geoLng: '',
      phone: '',
      website: '',
      companyName: '',
      catchPhrase: '',
      companyBs: '',
    })
  } 

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: field, value } = event.target;
    
    setValues(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: false }));
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setErrors({
      name: !name,
      username: !username,
      email: !email,
      street: !street,
      suite: !suite,
      city: !city,
      zipcode: !zipcode,
      geoLat: !geoLat,
      geoLng: !geoLng,
      phone: !phone,
      website: !website,
      companyName: !companyName,
      catchPhrase: !catchPhrase,
      companyBs: !companyBs,
    });

    if (!name || !username || !email 
      || !street || !suite || !city 
      || !zipcode || !geoLat || !geoLng 
      || !phone || !website || !companyName 
      || !catchPhrase || !companyBs) {
      return;
    }

    const newUser = {
      id: user?.id || maxId + 1,
      name,
      username,
      email,
      address: {
        street,
        suite,
        city,
        zipcode,
        geo: {
          lat: geoLat,
          lng: geoLng,
        }
      },
      phone,
      website,
      company: {
        name: companyName,
        catchPhrase,
        bs: companyBs,
      },
      isUpdated: !!user,
    }

    dispatch(action(newUser));

    dispatch(selectedUsersActions.setUser(newUser));

    if (!user) {
      clearForm();
    }

    dispatch(modalActions.setModal(false));
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <span 
          className="modal__close-btn"
          onClick={() => dispatch(modalActions.setModal(false))}
        >&times;</span>
        <form className="modal__form form" onSubmit={handleSubmit} onReset={clearForm} >
          <div className="form__container">
            <div>
              <SingleInput 
                handleChange={handleChange}
                name="name"
                value={name}
                isError={errors.name}
              />

              <SingleInput 
                handleChange={handleChange} 
                name="username"
                value={username}
                isError={errors.username}
              />

              <SingleInput 
                handleChange={handleChange} 
                name="email"
                type="email"
                value={email}
                isError={errors.email}
              />

              <SingleInput 
                handleChange={handleChange} 
                name="phone"
                value={phone}
                isError={errors.phone}
              />

              <SingleInput 
                handleChange={handleChange} 
                name="website"
                value={website}
                isError={errors.website}
              />
            </div>

            <div>
              <SingleInput 
                handleChange={handleChange} 
                name="street"
                value={street}
                isError={errors.street}
              />

              <SingleInput 
                handleChange={handleChange} 
                name="suite"
                value={suite}
                isError={errors.suite}
              />

              <SingleInput 
                handleChange={handleChange} 
                name="city"
                value={city}
                isError={errors.city}
              />

              <SingleInput 
                handleChange={handleChange} 
                name="zipcode"
                value={zipcode}
                isError={errors.zipcode}
              />

              <SingleInput 
                handleChange={handleChange} 
                name="geoLat"
                value={geoLat}
                isError={errors.geoLat}
              />

              <SingleInput 
                handleChange={handleChange} 
                name="geoLng"
                value={geoLng}
                isError={errors.geoLng}
              />
            </div>

            <div>
              <SingleInput 
                handleChange={handleChange} 
                name="companyName"
                value={companyName}
                isError={errors.companyName}
              />

              <SingleInput 
                handleChange={handleChange} 
                name="catchPhrase"
                value={catchPhrase}
                isError={errors.catchPhrase}
              />

              <SingleInput 
                handleChange={handleChange} 
                name="companyBs"
                value={companyBs}
                isError={errors.companyBs}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="button is-link"
            >
              {!user ? 'Add' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
})
