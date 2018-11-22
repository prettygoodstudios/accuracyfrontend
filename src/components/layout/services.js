import React from 'react';

const Services = (props) => {
  return(
    <div>
      <p><span class="start-phrase">Our services</span>  here is a comprehensive list of the various different accounting services we provide. We charge by the hour inorder to get a quote for a particular product shedule an apointment with one of our friendly staff. </p>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Hourly Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Taxes</td>
            <td>$20</td>
          </tr>
          <tr>
            <td>Bookeeping</td>
            <td>$20</td>
          </tr>
          <tr>
            <td>Audits</td>
            <td>$40</td>
          </tr>
          <tr>
            <td>Annual Reports</td>
            <td>$35</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Services;
