import React, { useMemo } from "react";
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import classNames from "classnames";
import './NewUserForm.scss';
import { User } from "../../types/User";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit/dist/createAction";
import * as selectedUsersActions from '../../features/selectedUser/selectedUserSlice';
import * as modalActions from '../../features/modal/modalSlice';


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
              <div>
                <label className="label" htmlFor="user-name">Name</label>

                <div>
                  <input 
                    type="text"
                    name="name"
                    id="user-name"
                    placeholder="Name"
                    maxLength={30}
                    value={name}
                    onChange={handleChange}
                  />
                </div>

                {errors.name && (
                  <p className="form__error">
                    Name is required
                  </p>
                )}
              </div>

              <div>
                <label className="label" htmlFor="use-username">Username</label>

                <div>
                  <input 
                    type="text"
                    name="username"
                    id="user-username"
                    maxLength={30}
                    placeholder="Username"
                    value={username}
                    onChange={handleChange}
                  />
                </div>

                {errors.username && (
                  <p className="form__error">
                    Username is required
                  </p>
                )}
              </div>

              <div>
                <label className="label" htmlFor="user-email">Email</label>

                <div>
                  <input 
                    type="email"
                    name="email"
                    id="user-email"
                    maxLength={30}
                    placeholder="username"
                    value={email}
                    onChange={handleChange}
                  />
                </div>

                {errors.username && (
                  <p className="form__error">
                    Email is required
                  </p>
                )}
              </div>

              <div>
                <label className="label" htmlFor="user-phone">Phone</label>

                <div>
                  <input 
                    type="text"
                    name="phone"
                    id="user-phone"
                    maxLength={30}
                    placeholder="Phone"
                    value={phone}
                    onChange={handleChange}
                  />
                </div>

                {errors.username && (
                  <p className="form__error">
                    Phone is required
                  </p>
                )}
              </div>

              <div>
                <label className="label" htmlFor="user-website">Website</label>

                <div>
                  <input 
                    type="text"
                    name="website"
                    id="user-website"
                    maxLength={30}
                    placeholder="Website"
                    value={website}
                    onChange={handleChange}
                  />
                </div>

                {errors.website && (
                  <p className="form__error">
                    Website is required
                  </p>
                )}
              </div>
            </div>

            <div>
              <div>
                <label className="label" htmlFor="user-street">Street</label>

                <div>
                  <input 
                    type="text"
                    name="street"
                    id="user-street"
                    maxLength={30}
                    placeholder="Street"
                    value={street}
                    onChange={handleChange}
                  />
                </div>

                {errors.street && (
                  <p className="form__error">
                    Street is required
                  </p>
                )}
              </div>

              <div>
                <label className="label" htmlFor="user-suite">Suite</label>

                <div>
                  <input 
                    type="text"
                    name="suite"
                    id="user-suite"
                    maxLength={30}
                    placeholder="Suite"
                    value={suite}
                    onChange={handleChange}
                  />
                </div>

                {errors.suite && (
                  <p className="form__error">
                    Suite is required
                  </p>
                )}
              </div>

              <div>
                <label className="label" htmlFor="user-city">City</label>

                <div>
                  <input 
                    type="text"
                    name="city"
                    id="user-city"
                    maxLength={30}
                    placeholder="City"
                    value={city}
                    onChange={handleChange}
                  />
                </div>

                {errors.city && (
                  <p className="form__error">
                    City is required
                  </p>
                )}
              </div>

              <div>
                <label className="label" htmlFor="user-zipcode">Zipcode</label>

                <div>
                  <input 
                    type="text"
                    name="zipcode"
                    id="user-zipcode"
                    maxLength={30}
                    placeholder="Zipcode"
                    value={zipcode}
                    onChange={handleChange}
                  />
                </div>

                {errors.zipcode && (
                  <p className="form__error">
                    Zipcode is required
                  </p>
                )}
              </div>


              <div>
                <label className="label" htmlFor="user-geoLat">Geo lat</label>

                <div>
                  <input 
                    type="text"
                    name="geoLat"
                    id="user-geoLat"
                    maxLength={30}
                    placeholder="Geo lat"
                    value={geoLat}
                    onChange={handleChange}
                  />
                </div>

                {errors.geoLat && (
                  <p className="form__error">
                    Geo lat is required
                  </p>
                )}
              </div>

              <div>
                <label className="label" htmlFor="user-geoLng">Geo lng</label>

                <div>
                  <input 
                    type="text"
                    name="geoLng"
                    id="user-geoLng"
                    maxLength={30}
                    placeholder="Geo lng"
                    value={geoLng}
                    onChange={handleChange}
                  />
                </div>

                {errors.geoLng && (
                  <p className="form__error">
                    Geo lng is required
                  </p>
                )}
              </div>
            </div>

            <div>
              <div>
                <label className="label" htmlFor="user-companyName">Company name</label>

                <div>
                  <input 
                    type="text"
                    name="companyName"
                    id="user-companyName"
                    maxLength={30}
                    placeholder="Company name"
                    value={companyName}
                    onChange={handleChange}
                  />
                </div>

                {errors.companyName && (
                  <p className="form__error">
                    Company name is required
                  </p>
                )}
              </div>
              
              <div>
                <label className="label" htmlFor="user-catchPhrase">Catch phrase</label>

                <div>
                  <input 
                    type="text"
                    name="catchPhrase"
                    id="user-catchPhrase"
                    maxLength={30}
                    placeholder="Catch phrase"
                    value={catchPhrase}
                    onChange={handleChange}
                  />
                </div>

                {errors.catchPhrase && (
                  <p className="form__error">
                    Catch phrase is required
                  </p>
                )}
              </div>
        
              <div>
                <label className="label" htmlFor="user-companyBs">Company bs</label>

                <div>
                  <input 
                    type="text"
                    name="companyBs"
                    id="user-companyBs"
                    maxLength={30}
                    placeholder="Company bs"
                    value={companyBs}
                    onChange={handleChange}
                  />
                </div>

                {errors.companyBs && (
                  <p className="form__error">
                    Company bs is required
                  </p>
                )}
              </div>
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
