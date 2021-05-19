import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {deleteProfile, getCurrentProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'

const Dashboard = ({getCurrentProfile, auth:{user}, profile:{profile, loading}, deleteProfile}) => {

    useEffect(()=> {
        getCurrentProfile()
    }, [])

    return loading && profile === null ? <Spinner /> : 
    (<>
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
        <i className="fas fa-user"></i>
        Welcome {user && user.name}
    </p>
    {profile !== null ? (<>
    <DashboardActions />
    <Experience experience={profile.experience}/>
    <Education education = {profile.education} />
    <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteProfile()}>
                <i className="fas fa-user-minus"></i>

                Delete My Account
            </button>
          </div>
     </>) : (
    <> 
    <p>You have not yet setup a profile, please add some info</p>
    <Link to ='/create-profile' className='btn btn-primary my-1'>
        Create Profile
    </Link>
     </>)}
    </>
    )
}


Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
} 

const mapStateToProps = state => ({
    auth: state.auth,
    profile:state.profile,
    deleteProfile: PropTypes.func.isRequired,
})

export default connect(mapStateToProps, {getCurrentProfile, deleteProfile})(Dashboard)
