import { API_URL, LOGIN, PATIENTS, RENDEZ_VOUS, USER_INFO } from "./endPoints";
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
export const addPatient = async (data) => {
  const token = await getData("newToken");
  const idUserString = await getData("idCurrentUser");
  const idUser = idUserString ? JSON.parse(idUserString) : null;
  if (!idUser) {
    throw new Error(
      "Impossible d'ajouter un patient sans identification de medecin "
    );
  } else {
    try {
      const response = await fetch(`${API_URL}/${PATIENTS}/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          adresse: data.adresse,
          adresseEmail: data.adresseEmail,
          dateNaissance: data.dateNaissance,
          nom: data.nom,
          prenom: data.prenom,
          sexe: data.sexe,
          taille: data.taille,
          telephone: data.telephone,
          tension_art: data.tension,
          personnel: idUser,
          poids: data.poids,
          pouls: data.pouls,
          dossier: {
            alergies: data.alergies,
            antecedentsMedicaux: data.antecedentsMedicaux,
            groupeSanguin: data.groupeSanguin,
            medicamentEnCours: data.medicamentEnCours,
          },
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur lors de l'insertion du patient :", errorData);
        throw new Error("Erreur lors de l'insertion  :" + errorData.message);
      } else {
        const patient = await response.json();
        return patient;
      }
    } catch (error) {}
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

// recuperation des rendez-vous  en fonction du medecin

export const getRendezVous = async () => {
  const token = await getData("newToken");

  try {
    const response = await fetch(`${API_URL}/${RENDEZ_VOUS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Erreur lors de la récupération des rendez-vous : ${errorData.message} (code ${response.status})`
      );
    }

    return await response.json(); // On retourne directement la promesse
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    throw new Error(
      "Une erreur s'est produite lors de la récupération des rendez-vous."
    );
  }
};

// ajout d;un nouveau rendez vous

export const addRendezVous = async (data) => {
  const token = await getData("newToken");
  const idDoctorString = await getData("idCurrentUser");
  const id = JSON.parse(idDoctorString);
  try {
    const response = await fetch(`${API_URL}/${RENDEZ_VOUS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        medecin: id,
        patient: data.id,
        date_heure: data.date,
        motif: data.motif,
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
    console.error("Erreur lors de la requête :", error);
    throw new Error(
      "Une erreur s'est produite lors de la récupération des rendez-vous."
    );
  }
};

// methode de supppression d'un rendezous annuler = supprimer
export const annulerRendezVous = async (id) => {
  const token = getData("newToken");
  try {
    const response = fetch(`${API_URL}/${RENDEZ_VOUS}${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Erreur lors de la  suppression du rendezvous  :",
        errorData
      );
      throw new Error(
        "Erreur lors de la  suppression du rendezvous :" + errorData.message
      );
    } else {
      const response = await response.json();
      return response;
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    throw new Error(
      "Une erreur s'est produite lors de la suppression du rendezvous."
    );
  }
};

// methode pour fmarquer un rendezvous comme fait, cela aura pour effet de modifier unique un attribut actif
export const marquerRendezVousFait = async (id) => {
  const token = getData("newToken");
  try {
    const response = fetch(`${API_URL}/${RENDEZ_VOUS}${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        actif: false,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Erreur lors de la mise a jour du rendezvous  :",
        errorData
      );
      throw new Error(
        "Erreur lors de la mise a jour du rendezvous :" + errorData.message
      );
    } else {
      const response = await response.json();
      return response;
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    throw new Error(
      "Une erreur s'est produite lors de la mise a jour du rendezvous."
    );
  }
};
