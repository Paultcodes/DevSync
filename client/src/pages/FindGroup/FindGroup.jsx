import './findgroup.css';
import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {FIND_GROUP} from '../../utils/mutations';
import { ButtonOne } from '../../components/buttons/Buttons';
import auth from '../../utils/auth';


const FindGroup = () => {
    const [findGroup, {data, error}] = useMutation(FIND_GROUP);
    const [formData, setFormData] = useState({
        groupCode: '',
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
        const {data} = await findGroup({
            variables: {...formData},
        });
        console.log(data.findGroup);
        auth.login(data.findGroup.token);
        } catch (err) {
        console.log(err);
        }
    };
    
    const handleChange = (e) => {
        setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        }));
        console.log(formData);
    };
    return (
        <div className="find-group">
        <div className="find-group-form">
            <h1>Find Group!</h1>
            <div className="group-buttons">
            <div className="group-buttons-form">
            <ButtonOne onClick={handleSubmit} buttonName="JavaScript" className="javascript"/>
            <ButtonOne onClick={handleSubmit} buttonName="HTML" />
            <ButtonOne onClick={handleSubmit} buttonName="CSS" />
            <ButtonOne onClick={handleSubmit} buttonName="React" />
            <ButtonOne onClick={handleSubmit} buttonName="Express" />
            <ButtonOne onClick={handleSubmit} buttonName="Node" />

            </div>
            </div>
        </div>
        </div>
    );
    };

export default FindGroup;