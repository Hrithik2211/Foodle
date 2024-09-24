import React, { useEffect,useState } from 'react'

function About() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('https://api.github.com/users/Hrithik2211')
      .then((res) => 
        res.json()
      )
      .then((data) => 
        setData(data)
      )
  },[])
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Field</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Github Name</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{data.name}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Github Followers</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{data.followers}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Github Followings</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{data.following}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Github A/C Link</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              <a href={data.html_url} target="_blank" rel="noopener noreferrer">{data.html_url}</a>
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Avatar</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              <img src={data.avatar_url} width={100} alt="gh-avatar" style={{ borderRadius: '50%' }} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default About