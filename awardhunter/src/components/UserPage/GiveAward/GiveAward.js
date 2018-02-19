import React from 'react';

require('./GiveAward.css')

class GiveAward extends React.Component {
    render() {
        return( 
            <div>
                <p>USER NAME</p>
                <p>USER EMAIL</p>
                <p>TYPE OF AWARD</p>
                <p>TIME STAMP</p>
                <p>USER WHO GAVE AWARD:</p>
                <table className='awardGiver'>
                    <tr>
                        <th>First Name </th>
                        <th>Last Name </th>
                        <th>Email </th>
                        <th>Department</th>
                    </tr>
                    <tr>
                        <td>Jimmy</td>
                        <td>Check</td>
                        <td>Jimmy@gmail.com</td>
                        <td>Accounting</td>
                    </tr>
                    <tr>
                        <td>Amber</td>
                        <td>Munoz</td>
                        <td>DG22@hotmail.com</td>
                        <td>Human Reources</td>
                    </tr>
                    <tr>
                        <td>Sam</td>
                        <td>Smith</td>
                        <td>smitty@yahoo.com</td>
                        <td>Information Technology</td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default GiveAward;