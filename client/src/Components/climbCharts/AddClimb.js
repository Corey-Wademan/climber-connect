import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {addClimb} from '../../actions/climb'
import { grades, pitchAmount } from '../profile-forms/ProfileSelectors'

const AddClimb = ({addClimb, history}) => {
	const [formData, setFormData] = useState({
		setting: '',
		grade: '',
		style: '',
		date: '',
		pitches: '',
		location: '',
		comment: ''
	})

	const {setting, grade, style, date, pitches, location, comment} = formData;

	// Max Date Logic For Calendar Input
	let today = new Date(); 
	let dd = today.getDate();
	let MM = today.getMonth()+1; // January = 0
	let yyyy = today.getFullYear();
	if(dd<10){
				dd='0'+dd
		} 
		if(MM<10){
				MM='0'+MM
		} 

	today = yyyy+'-'+MM+'-'+dd;

	const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
	
	const onSubmit = e => {
		e.preventDefault();
		addClimb(formData, history);
	};


	return (
		<div className='climb-form-container'>
			<h1>Add a climb</h1>

			<small>* = required field</small>
			<form className="form" onSubmit={e => onSubmit(e)}>
				<div className='form-group'>
					<input type="text" placeholder="*Location" name="location" value={location} onChange={e => onChange(e)}/>
				</div>

				<div className='form-group'>
					<div className='form-check'>
						<label>
							<input type="radio" name={setting} value='outdoors' onChange={e => onChange(e)}/> Outdoor
						</label>
					</div>
					<div className='form-check'>
						<label>
							<input type="radio" name={setting} value='gym' onChange={e => onChange(e)}/> Gym
						</label>
					</div>
				</div>

				<div className='form-group'>
					<label>
						<input type='date' name='date' value={date} max={today} onChange={e => onChange(e)} />
						When
					</label>
				</div>

				<div className='form-group'>
					<select type="text" name="style" value={style} onChange={e => onChange(e)}>
							<option value="" disabled>Style</option>
							<option value='boulder'>Boulder</option>
							<option value='sport'>Sport</option>
							<option value='trad'>Trad</option>
					</select>
				</div>

				<div className='form-group'>
					<small className='form-text'>Grade</small>
					<select name='grade' value={grade} onChange={e => onChange(e)}>
						{grades.map(num => (
							<option key={num} value={num}>
								{num}
							</option>
						))}
					</select>
				</div>

				<div className='form-group'>
				<small className='form-text'># of pitches</small>
					<select name='pitches' value={pitches} onChange={e => onChange(e)}>
						{pitchAmount.map(pitch => (
							<option key={pitch} value={pitch}>
								{pitch}
							</option>
						))}
					</select>
				</div>

				<div className='form-group'>
					<textarea placeholder='Add note' name='comment' value={comment} onChange={e => onChange(e)} />
					<small className='form-text'>Any beta?</small>
				</div>

				<input type="submit" className="btn btn-primary my-1" />
			</form>
		</div>
	)
}

AddClimb.propTypes = {
	addClimb: PropTypes.func.isRequired,
}

export default connect(null, {addClimb})(AddClimb)
