/* eslint-disable react/jsx-key */
import { Box, Grid, MenuItem, TextField, Button, Select, InputAdornment } from '@material-ui/core';
import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { FormHelperText, makeStyles } from '@material-ui/core';
import {
	CardCvcElement,
	CardNumberElement,
	CardExpiryElement,
	useElements
} from "@stripe/react-stripe-js";
import AmountNumberFormat from '../__number-format-customs/AmountNumberFormat';
import CardNumberFormat from '../__number-format-customs/CardNumberFormat';
import CVCNumberFormat from '../__number-format-customs/CVCNumberFormat';
import ExpiryDateFormat from '../__number-format-customs/ExpiryDateFormat';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
	formControl: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		minWidth: '100%',
	},
  primaryAction: {
		margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  secondaryAction: {
		margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
}));

export interface IAction {
	text?: string,
	onClick?: Function,
	type?: any,
	fullWidth?: any,
}

export interface IStripeForm {
	primaryAction?: IAction,
	secondaryAction?: IAction,
	setData?: any,
	content?: any,
}

interface IStripeFormInput {
	currency: string;
	amount: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvcNumber: string;
}

const StripeForm = (props: IStripeForm = {
	primaryAction: { type: 'button', fullWidth: false },
	secondaryAction: { type: 'button' },
}) => {
	const classes = useStyles();

	const [errors, setErrors] = React.useState({
		currency: '',
		amount: '',
		cardNumber: '',
		cardExpiry: '',
		cardCvcNumber: '',
	});
	const [paymentData, setPaymentData] = React.useState({
		currency: 'USD',
		amount: '',
		cardNumber: '',
		cardExpiry: '',
		cardCvcNumber: '',
	} as IStripeFormInput);
	
  const content = {
		'currencies': [
			{value: 'USD', text: 'USD'},
			{value: 'GBP', text: 'GBP'},
			{value: 'EUR', text: 'EUR'}
		],
		
    ...props.content
	};

	const { primaryAction, secondaryAction, setData } = props;

	const primarySubmit = () => {
		
		let tempErrors = {
			currency: '',
			amount: '',
			cardNumber: '',
			cardExpiry: '',
			cardCvcNumber: '',
		};
		
		if (paymentData.amount === "") {
			tempErrors = { ...tempErrors, amount: "Amount cannot be empty." };
		}
		if (paymentData.cardNumber === "") {
			tempErrors = { ...tempErrors, cardNumber: "Credit card number cannot be empty." };
		}
		if (paymentData.cardExpiry === "") {
			tempErrors = { ...tempErrors, cardExpiry: "Credit card expiry date cannot be empty." };
		}

		setErrors(tempErrors);

		for (const key in tempErrors) {
			if (tempErrors[key] !== "") {
				return;
			}
		}

		setData(paymentData);
		primaryAction.onClick();
	}

	const secondarySubmit = () => {
		secondaryAction.onClick();
	}

	return (
		<React.Fragment>
			<Box>
				<Grid container spacing={1}>
					<Grid item xs={12} md={6}>
						<FormControl variant="outlined" className={classes.formControl} {...props}>
							<InputLabel id={'currency'} margin='dense'>{'Currency'}</InputLabel>
							<Select
								id='currency'
								label='Currency'
								name='currency'
								defaultValue="USD"
								value={paymentData.currency}
								margin="dense"
								variant="outlined"
								onChange={(event) => setPaymentData({
									...paymentData,
									currency: event.target.value as string
								})}
								required
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{content['currencies'].map(currency => (
									<MenuItem value={currency.value}>{currency.text}</MenuItem>
								))}
							</Select>
						</FormControl>
												
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							label="Amount"
							name="amount"
							variant="outlined"
							margin="dense"
							required
							fullWidth
							helperText={errors.amount && errors.amount}
							error={errors.amount === "" ? false : true}
							onChange={(event) => setPaymentData({
								...paymentData,
								amount: event.target.value
							})}
							InputProps={{
								inputProps: {
									component: CardNumberElement
								},
								endAdornment: <InputAdornment position="end">{paymentData.currency}</InputAdornment>,
								inputComponent: AmountNumberFormat as any
							}}
						/>
					</Grid>
				</Grid>
			</Box>
			<Box mt={1}>
				<TextField
					label="Credit Card Number"
					name="cardNumber"
					variant="outlined"
					margin="dense"
					required
					fullWidth
					helperText={errors.cardNumber && errors.cardNumber}
					error={errors.cardNumber === "" ? false : true}
					onChange={(event) => setPaymentData({
						...paymentData,
						cardNumber: event.target.value
					})}
					InputProps={{
						inputProps: {
							component: CardNumberElement
						},
						inputComponent: CardNumberFormat as any
					}}
				/>
				<Grid container spacing={1}>
					<Grid item xs={12} md={6}>
						<TextField
							label="Expiration Date"
							name="cardExpiry"
							variant="outlined"
							margin="dense"
							required
							fullWidth
							helperText={errors.cardExpiry !== "" && errors.cardExpiry}
							error={errors.cardExpiry === "" ? false : true}
							onChange={(event) => setPaymentData({
								...paymentData,
								cardExpiry: event.target.value
							})}
							InputProps={{
								inputProps: {
									component: CardExpiryElement
								},
								inputComponent: ExpiryDateFormat as any
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							label="CVC (If applicable)"
							name="cvc"
							variant="outlined"
							margin="dense"
							fullWidth
							helperText="CVC number is the 3 digit number at the back of your card"
							onChange={(event) => setPaymentData({
								...paymentData,
								cardExpiry: event.target.value
							})}
							InputProps={{
								inputProps: {
									component: CardCvcElement
								},
								inputComponent: CVCNumberFormat as any
							}}
						/>
					</Grid>
				</Grid>
			</Box>
			<Box mt={3} position='right'>
				{secondaryAction && (
					<Button
						type={secondaryAction.type}
						variant="contained"
						onClick={secondarySubmit}
						className={classes.secondaryAction}
					>
						{secondaryAction.text}
					</Button>
				)}
				<Button
					type={primaryAction.type}
					variant="contained"
					color="primary"
					fullWidth={primaryAction.fullWidth}
					onClick={primarySubmit}
					className={classes.primaryAction}
				>
					{primaryAction.text}
				</Button>
			</Box>
		</React.Fragment>
	);
}

export default StripeForm;
