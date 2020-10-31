import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup, Col } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Redirect } from 'react-router-dom';


function Transfer (props) {
    const [validCustomer, setValidCustomer] = useState(1);
    const [sameCustomer, setSameCustomer] = useState(0);
    const [balanceCheck, setBalanceCheck] = useState("Sufficient");
    const [putTransferTo, setPutTransferTo] = useState(false);
    const [putTransferFrom, setPutTransferFrom] = useState(false);
    const [postTransaction, setPostTransaction] = useState(false);

    const { customers, customer, setRefreshData } =  props;

    setRefreshData(putTransferFrom && putTransferTo && postTransaction);

    const { register, handleSubmit, errors } = useForm({mode:  'onBlur'});
    const onSubmit = (data) => {

        let username = data.firstname + ' ' + data.lastname;

        if(username === customer.name) {
            setSameCustomer(1);
        }
        else {
            // Here, filtering the user from the database with filled the one in form data
            const customerList = customers.filter((customer) => {
                if(username || data.creditAccount || data.creditCustomer !== "Other Customers") {
                    return customer.name === username || customer.accountNumber === Number(data.creditAccount) || customer.name === data.creditCustomer
                }
            });
            setValidCustomer(customerList.length);

            
            var balanceState;
            if(customer.balance === 0){
                balanceState = 0;
                setBalanceCheck(balanceState);
            }
            else if(customer.balance < Number(data.transferAmount)){
                balanceState = "Insufficient";
                setBalanceCheck(balanceState);
            }
            else if(customer.balance >= Number(data.transferAmount)) {
                balanceState = "Sufficient";
            }
            //here, we will verify the customer & balance status to make the transaction and notify errors, if any
            if(customerList.length === 1 && balanceState === "Sufficient") {
                const transferToData = {
                    balance: customerList[0].balance + Number(data.transferAmount),
                    credit: Number(data.transferAmount)
                }
                const transferFromData = {
                            balance: customer.balance - Number(data.transferAmount),
                            debit: Number(data.transferAmount)
                        }
                // function for updating the customer data
                function transfer(url, transfer){
                    fetch(url, {
                        method: 'PUT', 
                        body: JSON.stringify(transfer),
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    .then(response => response.json())
                    .then(result => {
                        if(transfer ===  transferFromData){
                            setPutTransferFrom(result);
                        }
                        else if(transfer === transferToData){
                            setPutTransferTo(result);
                        }
                        console.log('Success:', result);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }

                // transfer to
                transfer(baseUrl + `users/${customerList[0]._id}`, transferToData);
                
                // transfer from
                transfer(baseUrl + `users/${customer._id}`, transferFromData);
                
                // transaction table
                fetch(baseUrl + 'transactions', {
                    method: 'POST',
                    body: JSON.stringify({
                        transferTo: customerList[0].name,
                        transferFrom: customer.name,
                        description: data.description,
                        debitedAmount: Number(data.transferAmount),
                        balance: customer.balance - Number(data.transferAmount)
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                .then(response => response.json())
                .then(result => {
                    setPostTransaction(result);
                    console.log("success: ", result);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        }
    }
    
    return (
        <section id="transfer" className="d-md-flex flex-column justify-content-center align-items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column justify-content-center align-items-center text-white" >
                <h1 className="pb-4 heading-light">Tell us the details for your transfer</h1>
                <FormGroup className="d-inline-flex my-3">
                    <Col xs={12} md={6} className="pl-0 text-left">
                        <input name="firstname" 
                            type="text" 
                            className={errors.firstname ? "input-errors mb-3" : "input-full mb-3"}
                            aria-invalid={errors.firstname ? true : false} 
                            ref={register({
                                minLength: 3, 
                                maxLength: 15
                            })} 
                            placeholder="Beneficiary First Name" 
                        />
                        {errors.firstname?.type === "maxLength" && <div style={{color: "red"}}>Lastname exceed 15 letters</div>}
                        {errors.firstname?.type === "minLength" && <div style={{color: "red"}}>Lastname must have 2 letters</div>}
                    </Col>
                    <Col xs={12} md={6} className="p-0 text-right">
                    <input name="lastname" 
                        type="text" 
                        className={errors.lastname ? "input-errors mb-3" : "input-full mb-3"}
                        placeholder="Beneficiary Last Name"
                        aria-invalid={errors.lastname ? true : false}
                        ref={register({ 
                                minLength: 3, 
                                maxLength: 15 
                                })} 
                    />
                    {errors.lastname?.type === "maxLength" && <div style={{color: "red"}}>Lastname exceed 15 letters</div>}
                    {errors.lastname?.type === "minLength" && <div style={{color: "red"}}>Lastname must have 2 letters</div>}
                    </Col>
                </FormGroup>
                <h4 className="text-center my-3">OR</h4>
                <FormGroup className="my-3">
                    <input 
                        name="creditAccount"
                        type="text" 
                        className={errors.creditAccount ? "input-errors mb-3" : "input-full mb-3"}
                        placeholder="Account Number"
                        aria-invalid={errors.creditAccount ? true : false}
                        ref={register({
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Invalid! Only Number can be entered"
                            },
                            minLength: 11,
                            maxLength: 17,
                        })} 
                    />
                    {errors.creditAccount?.type === "maxLength" && <div style={{color: "red"}} >Account Number exceed maxLength 17</div>}
                    {errors.creditAccount?.type === "minLength" && <div style={{color: "red"}} >Account Number must have 11 Numbers</div>}
                </FormGroup>
                <h4 className="text-center my-3">OR</h4>
                <select name="creditCustomer" ref={register} style={{borderWidth: "1px"}} className="input-full my-3" placeholder="Other Customers">
                    <option defaultValue>Other Customers</option>
                    {customers.filter((customers) => customers !== customer).map((customers) => {
                        return(
                            <React.Fragment key={customers._id}>
                                <option value={customers.name}>
                                    {customers.name}
                                </option>
                            </React.Fragment>
                        )
                    }) }
                </select>
                <FormGroup className="my-5">
                    <input name="transferAmount" 
                        aria-invalid={errors.transferAmount ? true : false} 
                        ref={register({
                            required: true,
                            min: {
                                value: 1,
                                message: 'Enter the amount greater than 0'
                            }
                        })} 
                        className={errors.transferAmount ? "input-errors mb-3" : "input-full mb-3"} 
                        placeholder="Amount"/>
                    {errors.transferAmount?.type === "required" && <div style={{color: "red"}} >Required Field</div>}
                </FormGroup>
                
                <FormGroup >
                    <input name="description" className="input-full mb-3" ref={register} placeholder="Add Transaction Note"/>
                </FormGroup>

                {balanceCheck !== "Sufficient" ? balanceCheck === "Insufficient" ? <h5 style={{color: "red"}} className="my-3">Insufficient Balance</h5>  : <h5 style={{color: "red"}} className="my-3">Zero Balance</h5> : null}
                {validCustomer < 1 ? validCustomer === 0  ? <h5 style={{color: "red"}} className="my-3">Please! check the details. No Inputs</h5> : null : <h5 style={{color: "red"}} className="my-3">Please! double check the details. Mismatch Fields</h5>}

                <button type="submit" className="button mt-4 mb-0" >Transfer</button>
                {sameCustomer === 1 ? <h5 style={{color: "red"}} className="my-3">Same User! Cannot initiate Transaction.</h5> : null}
                {/* Redirect to homepage after users data updation and successful transaction */}
                {putTransferFrom && putTransferTo && postTransaction ? <Redirect to={{pathname: '/home'}} /> : null}
            </form>
        </section>
    );
}

export default Transfer;
