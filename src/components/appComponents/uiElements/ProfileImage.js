import React, { useContext } from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { AuthContext } from '../../../routers/AppRouter'

export const ProfileImage = () => {

    const { state: authState } = useContext(AuthContext)

    const handleProfileClick = (e) => {
        
        // const formData = new FormData()

        // formData.append('File', e.target.files[0])

        // console.log(formData)

        // const reader = new FileReader();
        // const file = e.target.files[0];

        // reader.readAsBinaryString(file)

        // reader.onloadend = () => {
        //     console.log('loaded')
        //     const pfp = reader.result

        //     console.log(pfp)
            // fetch(apiUrl(`user/${authState.user.id}`), {
            //     method: 'PUT',
            //     headers: {
            //         authorization: authState.token,
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         name: authState.user.name,
            //         email: authState.user.email,
            //         mfaEnabled: authState.user.mfaEnabled,
            //         settings: {
            //             ...authState.user.settings,
            //             profileImage: pfp
            //         }
            //     })
            // }).then(res => {
            //     if (res.ok) {
            //         return res.json()
            //     } else {
            //         throw new Error('Something went wrong')
            //     }
            // }).then(data => {
            //     console.log(data)
            //     dispatch({
            //         type: 'CHANGE_PFP',
            //         payload: pfp
            //     })
            //     JSON.parse(localStorage.setItem('user', JSON.stringify(data)));
            // }).catch(err => {
            //     console.log(err)
            // })
        }

    return (
        <div className="nav__pfpImage">
            {
                (!authState.user.settings.profileImage || authState.user.settings.profileImage === 'default' ) 
                ?    <Avatar size={125} icon={<UserOutlined />} ></Avatar>
                :    <Avatar size={125} src={authState.user.settings.profileImage} />
            }
            <input type="file" text="" onChange={ (e) => handleProfileClick(e) }/>

        </div>
    )
}
