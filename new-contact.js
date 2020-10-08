import { html, LitElement, css } from 'lit-element';
import '@material/mwc-formfield';
import '@material/mwc-textfield';
import '@material/mwc-button';
import '@material/mwc-icon/mwc-icon-host-css';

class NewContact extends LitElement {
    /**
      * Declared properties and their corresponding attributes
      */
    static get properties() {
        return {
            data: { type:Object }
        };
    }

    static get styles() {
        return css`
            :host {
                display: block,
            }
            form{
                border: 1px solid red;
            }
            mwc-textfield {
                margin: 5px;
            }
        `
    }

    constructor() {
        super();
        this.data = {}
    }

    render() {
        return html`
            <form>
                <mwc-textfield label="Nombre"required ></mwc-textfield>
                <mwc-textfield label="telefono"required></mwc-textfield>
                <mwc-textfield label="Email"required></mwc-textfield>
                <mwc-textfield label="Fecha"required></mwc-textfield>
                <mwc-button label="Agregar" @click="${this.sendData}"></mwc-button>
            </form>
        `;
    }

    sendData(e) {
        const [ Nombre, telefono, Email, Fecha] = this.shadowRoot.querySelectorAll('[label]');
        this.dispatchEvent(new CustomEvent('contact-data', {
            detail: {
                nombre: Nombre.value,
                telefono: telefono.value,
                email: Email.value,
                fechaNan: Fecha.value
            }
        }))
        Nombre.value = '',
        telefono.value = '',
        Email.value = '',
        Fecha.value = ''
    }
}


window.customElements.define('new-contact',NewContact)