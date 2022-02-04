import { createElement } from 'lwc';
import searchOrderRecords from 'c/searchOrderRecords';

import getOrderList from '@salesforce/apex/Controller.searchOrders';

// Realistic data with a list of contacts
const mockOrderList = require('./data/IWCdatatable.json');
jest.mock(
    '@salesforce/apex/Controller.searchOrders',
    () => {
        const {
            createApexTestWireAdapter
        } = require('@salesforce/sfdx-lwc-jest');
        return {
            default: createApexTestWireAdapter(jest.fn())
        };
    },
    { virtual: true }
)
describe('c-search-order-records', () => {
    beforeEach(() => {
        const element =createElement('c-search-order-records',
        {
            is: searchOrderRecords
        })
        document.body.appendChild(element)
    }) 
  
    it('test no records', ()=>{
        getOrderList.mockResolvedValue(mockOrderList)
        const element = document.querySelector('c-l-w-c-datatable')
        const inputElement = element.shadowRoot.querySelector('lightning-input')
        const text = element.shadowRoot.querySelector('div');
        inputElement.dispatchEvent(new CustomEvent('change'));
        return Promise.resolve().then(()=>{
            expect(text.textContent).toBe('--No Order Records Found--')
        })
    })

    test('onChange test values', () =>{
        // eslint-disable-next-line @lwc/lwc/no-document-query
        const element = document.querySelector('c-search-order-records')
        element.orderList = "Test Order";
        element.noRecordsFound = false;
        document.body.appendChild(element);
        const inputElement = element.shadowRoot.querySelector('lightning-input')
        inputElement.dispatchEvent(new CustomEvent('change'))
        const text = element.shadowRoot.querySelector('Lightning-datatable');
        return Promise.resolve().then(()=>{
            expect(text.textContent).toBe('')
        })

    })

    it('get mock data', ()=>{
        getOrderList.mockResolvedValue(mockOrderList)
        // eslint-disable-next-line @lwc/lwc/no-document-query
        const element = document.querySelector('c-search-order-records')
        element.orderList = "Test Order";
        element.noRecordsFound = false;
        const buttonElement = element.shadowRoot.querySelector('lightning-input')
        buttonElement.dispatchEvent(new CustomEvent('change'))
        const text = element.shadowRoot.querySelector('lightning-datatable');
        return Promise.resolve().then(()=>{
            const elem = element.shadowRoot.querySelector('lightning-datatable');
            expect(text.textContent).toBe('');
            expect(elem.Name).toBe(mockOrderList.Name);
        })
    })

    it('test', ()=>{
        getOrderList.mockResolvedValue(mockOrderList)
        const element = document.querySelector('c-search-order-records')
        document.body.appendChild(element);
        // Property value is assigned after the component is inserted into the DOM
        element.ProductList = "Test Order";
        element.noRecordsFound = false;
        // Use a promise to wait for asynchronous changes to the DOM
        return Promise.resolve().then(() => {
            expect(element.noRecordsFound).not.toContain('false');
            expect(element.ProductList).toContain('Test Order');
        })
    })
})
