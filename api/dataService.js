import { API_URL, LOGIN, PATIENTS, USER_INFO } from "./endPoints";
import { getData } from "../services/stockage";
// fonction de login

export const login = async (name, Password) => {
  try {
    // connection au serveur via la methode fetch de l'api Fetch
    const response = await fetch(`${API_URL}/${LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        password: Password,
      }),
    });
    // on teste le status de la response
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erreur lors de la connexion :", errorData);
      throw new Error("Erreur lors de la connexion : " + errorData.message);
    }
    const resonpse = await response.json();
    console.log(resonpse);
    return resonpse;
  } catch (error) {
    console.error("Erreur lors de la requête :", error.message);
    throw new Error("Erreur lors de la requête : " + error.message);
  }
};

// fonction de récupération des informations du user
export const getUserInfo = async (token) => {
  try {
    const response = await fetch(`${API_URL}/${USER_INFO}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Erreur lors de la récupération des informations :",
        errorData
      );
      throw new Error(
        "Erreur lors de la récupération des informations :" + errorData.message
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la requete:", error.message);
    throw new Error("Erreur lors de la requete :" + error.message);
  }
};
// recuperation des informations des patients

export const getPatients = async () => {
  const token = await getData("newToken");
  try {
    const response = await fetch(`${API_URL}/${PATIENTS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erreur lors de la récupération des patients :", errorData);
      throw new Error(
        "Erreur lors de la récupération des patients :" + errorData.message
      );
    } else {
      const patient = await response.json();
      return patient;
    }
  } catch (error) {
    console.error("Erreur lors de la requete :", error.message);
    throw new Error("Erreur lors de la requete :" + error.message);
  }
};

// ajouter un nouveau patient
export const addPatients = async (information) => {
  const token = await getData("newToken");

  try {
    const response = await fetch(`${API_URL}/${PATIENTS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        personne: {
          date_naissance: information.trueFormDate,
          sexe: information.sexe,
          first_name: information.nom,
          last_name: information.prenom,
          address: information.adresse,
          phone_number: information.phone,
          email: information.email,
        },
        poids: information.poids,
        taille: information.taille,
        tension_art: information.tension,
        temperature: information.temperature,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erreur lors de l'ajout du patient :", errorData);
      throw new Error(
        "Erreur lors de l'ajout du patient :" + errorData.message
      );
    } else {
      const patient = await response.json();
      return patient.personne.first_name;
    }
  } catch (error) {
    console.error("Erreur lors de la requete :", error.message);
    throw new Error("Erreur lors de la requete :" + error.message);
  }
};

// mise a jour des informations patients
export const updatePatient = async (information, id) => {
  const token = await getData("newToken");
  try {
    const response = await fetch(`${API_URL}/${PATIENTS}${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        personne: {
          date_naissance: information.trueFormDate,
          sexe: information.sexe,
          first_name: information.nom,
          last_name: information.prenom,
          address: information.adresse,
          phone_number: information.phone,
          email: information.email,
        },
        poids: information.poids,
        taille: information.taille,
        tension_art: information.tension,
        temperature: information.temperature,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Erreur lors de la  mise a jour des information  du patient :",
        errorData
      );
      throw new Error(
        "Erreur lors de la mise a jou  du patient :" + errorData.message
      );
    } else {
      const patient = await response.json();
      return patient;
    }
  } catch (error) {
    console.error("Erreur lors de la requete :", error.message);
    throw new Error("Erreur lors de la requete :" + error.message);
  }
};
