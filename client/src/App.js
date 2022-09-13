import React,{useState} from 'react';
import { PlusOutlined,PhoneOutlined,SearchOutlined } from '@ant-design/icons';
import { Button, Input,Card,Col, Row ,Divider} from 'antd';
import './App.css';
import Axios from 'axios';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const App = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [newPhoneNumber, setNewPhoneNumber] = useState(0);

  const [contactList,setContactList] = useState([]);

  const addContact =()=>{
    Axios.post('http://localhost:3001/create',{
      firstName:firstName,
      lastName:lastName,
      phoneNumber:phoneNumber,
    }).then(()=>{
      setContactList([
        ...contactList,
        {
          firstName:firstName,
          lastName:lastName,
          phoneNumber:phoneNumber,
        },
      ]);
    });
  }

  const getContact =()=>{
    Axios.get('http://localhost:3001/contacts').then((response)=>{
    setContactList(response.data);
    })
  };

  const getNewPhoneNumber =(id)=>{
    Axios.put('http://localhost:3001/update', 
    {
      phoneNumber: newPhoneNumber,
      id:id
    }).then(
      (response) => {
        setContactList(
          contactList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  firstName:val.firstName,
                  lastName:val.lastName,
                  phoneNumber: newPhoneNumber
                }
              : val;
          })
        );
      }
    );
  };


  const deleteContact =(id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
    setContactList(
      contactList.filter((val)=>{
        return val.id!==id;
      })
    );
    })
  };

  return(
    <>
      <div className='App'>
        <Card className="site-card-border-less-wrapper" 
                            
        bordered={false}>
        <div  >
          <h3>First Name:</h3>
          <Input className='contacts' placeholder="First Name" type="text" onChange={(e)=>{setFirstName(e.target.value)}} style={{height:40, marginBottom:10}}/>
          <h3>Last Name:</h3>
          <Input className='contacts' type="text" onChange={(e)=>{setLastName(e.target.value)}} style={{height:40,marginBottom:10}}/>
          <h3>Phone Number:</h3>
          <Input className='contacts' type="number" onChange={(e)=>{setPhoneNumber(e.target.value)}} style={{height:40,marginBottom:10}}/>
          <Button type="primary" icon={<PlusOutlined />} size="large"  onClick={addContact}>Add Contact</Button>
        </div>
        </Card>
        <div className="contacts">
          <Button icon={<PhoneOutlined />} size="large" onClick={getContact}>Show Contacts</Button>
          <br/>
          <div className="site-card-border-less-wrapper">
          <Card
            title="Contact Detail"
            bordered={false}
            style={{
                      width: 700,
                    }}
                  >
          {contactList.map((val, key) => {
            return (
            <>
                <div style={{
                      margin: 30,
                    }}>
                      <Row >
                        
                        <Col span={12}>
                          <h3>First Name: {val.firstName}</h3>
                          <h3>Last Name: {val.lastName}</h3>
                          <h3>Phone Number: {val.phoneNumber}</h3></Col>
                        <Col span={12}>
                        <div>                   
                          <Input 
                          style={{height:40}}
                          type="text"
                          placeholder="update phone number"
                          onChange={(event) => {
                            setNewPhoneNumber(event.target.value);
                          }}
                        />
                          <Button type="primary" 
                          // className='update'
                          onClick={() => {
                            getNewPhoneNumber(val.id);
                          }}
                          >
                            {" "}
                            Update
                          </Button>
                        </div>
                        <div>
                          <Button 
                          // className='delete'
                            onClick={() => {
                              deleteContact(val.id);
                            }}
                            danger
                          >
                            Delete
                          </Button>
                        </div>
                        </Col>
                      </Row>
                      <Divider />
                </div>
            </>
            );
          })}
          </Card>
          </div>
        </div>
      </div>
    </>
  )
};



export default App;



