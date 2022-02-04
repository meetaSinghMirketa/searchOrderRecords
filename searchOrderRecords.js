import { LightningElement, track } from 'lwc';
import searchOrders from '@salesforce/apex/Controller.searchProducts';
const columnList = [
    {label: 'Id', fieldName: 'Id'},
    {label: 'Name', fieldName: 'Name'},
    {label: 'Email', fieldName: 'Email__c'},
    {label: 'Address', fieldName: 'Address__c'}
];

export default class SearchOrderRecords extends LightningElement {
    @track productList;
    @track columnList = columnList;
    @track noRecordsFound = true;

    findOrderResult(event) {
        const ordName = event.target.value;

        if(accName) {
            searchOrders ( {ordName}) 
            .then(result => {
                this.orderList = result;
                this.noRecordsFound = false;
            })
        } else {
            this.orderList = undefined;
            this.noRecordsFound = true;
        }
    }

}
