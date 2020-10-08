import { html, LitElement } from 'lit-element';
import style from './dashboard-app-styles.js';
import './new-contact';
import '@material/mwc-button';
import '@material/mwc-icon/mwc-icon';


class DashboardApp extends LitElement {
  static get properties() {
    return {
      contacts: { type: Array },
      open: { type: Boolean }
    };
  }

  static get styles() {
    return style;
  }

  constructor() {
    super();
    this.contacts = [];
    this.open = false; 
  }

  connectedCallback() {
    super.connectedCallback();
    if (localStorage.getItem('contactos')) {
      this.contacts = JSON.parse(localStorage.getItem('contactos'))
    }
  }

  render() {
    return html`
        <mwc-button unelevated label="add" @click="${this.handleOpen}"></mwc-button>
        ${(this.open) ? html`
            <new-contact @contact-data="${this.saveContact}"></new-contact>
          ` : html`` }
        <table>
          <thead class="thead-dark">
            <tr>
              <th scope="col">idPersona</th>
              <th scope="col">Nombre Completo</th>
              <th scope="col">Telefono</th>
              <th scope="col">Email</th>
              <th scope="col">Fecha Nacimiento</th>
              <th>controls</th>
            </tr>
          </thead>
          <tbody>
            ${this.contacts.map((contact, index) => html`<tr>
              <td>${index + 1 }</td>
              <td>${contact.nombre}</td>
              <td>${contact.telefono}</td>
              <td>${contact.email}</td>
              <td>${contact.fechaNan}</td>
              <td><button @click="${this.handleDelete(index)}">Delete</button> <button>Update</button></td>
            </tr>`)}
          </tbody>
        </table>
      `;
    }

    handleOpen(e) {
      e.preventDefault();
      this.open = !this.open;
      console.log(this.open)
    }

    saveContact({ detail }) {
      console.log(detail)
      this.contacts = [...this.contacts, detail];
      this.saveLocalStorage();
    }

    saveLocalStorage(){
      localStorage.setItem('contactos', JSON.stringify(this.contacts))
    }

    handleDelete(position) {
      this.contacts.splice(position, 1);
      this.saveLocalStorage();
    }

    // Preguntar como se Hace el update de componentes
    
}

window.customElements.define("dashboard-app", DashboardApp);
