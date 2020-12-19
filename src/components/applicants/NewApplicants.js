import React from 'react';
import { connect } from 'react-redux';
import NewApplicantsItem from './NewApplicantsItem';

function NewApplicants({newApplicants}) {
    return (
        <div>
            {newApplicants.map( (item) => <NewApplicantsItem item={item} key={item.tempID}/>)}
        </div>
    )
}

const mapStateToProps = ({ newApplicants }) => ({ newApplicants })
export default connect(mapStateToProps)(NewApplicants)
