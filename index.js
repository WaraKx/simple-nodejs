console.log("test from node");
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

// app.get("/", (req, res) => {
//     res.json({
//         msg: "hello from API"
//     })
// })

app.listen(port, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

// app.post("/", (req, res) => {
// 	res.json({
// 		msg: "ici le post !!!",
// 	})
// })

// GET : LIRE tous les utilisateurs
// app.get("/", (req, res) => {
//     res.json({
//         msg: "hello rest api 👌",
//     });
// });

// PUT : MODIFIER un utilisateur basé sur les données envoyées dans le corps (body)
// et le paramètre passé dans l'URL
// app.put("/", (req, res) => {
//     res.json({
//         msg: "hello rest api ici le PUT 👌",
//     });
// });

// DELETE : supprimer un utilisateur basé sur le paramètre passé dans l'URL 
// app.delete("/", (req, res) => {
//     res.json({
//         msg: "hello rest api ici le DELETE 👌",
//     });
// });

// GET : LIRE tous les utilisateurs
app.get("/", (req, res) => {
	res.json(users)
})

const users = [
	{ id: 1, firstName: "John", lastName: "Doe", role: "admin" },
	{ id: 2, firstName: "Jane", lastName: "Smith", role: "user" },
	{ id: 3, firstName: "Alice", lastName: "Johnson", role: "moderator" },
	{ id: 4, firstName: "Bob", lastName: "Brown", role: "user" },
	{ id: 5, firstName: "Charlie", lastName: "Davis", role: "admin" },
]

// app.post("/", (req, res) => {
//     console.log(req.body);
    
// 	res.json({
// 		msg: "ici le post !!!",
// 	})
// })

// POST : CRÉER un nouvel utilisateur, basé sur les données passées dans le corps(body) de la requête
app.post("/", (req, res) => {
	// récupérer toutes les données qui arrivent dans le corps de la requête (body)
	const { firstName, lastName } = req.body

	// récupérer l'ID du dernier utilisateur en fonction du nombre d'utilisateurs dans notre variable de tableau 'users'.
	const lastId = users[users.length - 1].id
	// ajouter un pour créer un utilisateur unique
	const newId = lastId + 1

	// créer le nouvel utilisateur avec les données du corps de la requête et l'ID calculé
	const newUser = {
		firstName,
		lastName,
		id: newId,
	}

	// ajouter le nouvel utilisateur à notre liste d'utilisateurs en utilisant la méthode 'push'
	users.push(newUser)
	// envoyer le code de statut 201 (créé) et les données du nouvel utilisateur afin de confirmer au client.
	res.status(201).json(newUser)
})

// PUT : Modifier un utilisateur en fonction de son ID
app.put("/:id", (req, res) => {
    // Récupérer l'ID depuis les paramètres de l'URL et le convertir en entier
    const id = parseInt(req.params.id);

    // Trouver l'utilisateur dans la liste par son ID
    const userIndex = users.findIndex((user) => user.id === id);

    // Vérifier si l'utilisateur existe
    if (userIndex < 0) {
        return res.status(404).json({ msg: "utilisateur non trouvé" });
    }

    // Récupérer les données envoyées dans le corps de la requête
    const { firstName, lastName } = req.body;

    // Mettre à jour les champs de l'utilisateur si les valeurs sont fournies
    if (firstName) users[userIndex].firstName = firstName;
    if (lastName) users[userIndex].lastName = lastName;

    // Envoyer une réponse indiquant que l'utilisateur a été mis à jour
    res.json({
        msg: "utilisateur mis à jour",
        user: users[userIndex],
    });
});

app.delete("/:id", (req, res) => {
    // Récupérer l'ID depuis les paramètres de l'URL et le convertir en entier
    const id = parseInt(req.params.id);

    // Trouver l'utilisateur dans la liste par son ID
    const userIndex = users.findIndex((user) => user.id === id);

    // Vérifier si l'utilisateur existe
    if (userIndex < 0) {
        return res.status(404).json({ msg: "utilisateur non trouvé" });
    }

    // Si trouvé, supprimer l'utilisateur du tableau
    users.splice(userIndex, 1);

    // Envoyer une réponse confirmant la suppression
    res.json({
        msg: "utilisateur supprimé",
    });
});

// GET : Récupérer un utilisateur en fonction de son ID
app.get("/:id", (req, res) => {
    // Récupérer l'ID depuis les paramètres de l'URL et le convertir en entier
    const id = parseInt(req.params.id);

    // Trouver l'utilisateur dans la liste par son ID
    const userIndex = users.findIndex((user) => user.id === id);

    // Vérifier si l'utilisateur existe
    if (userIndex < 0) {
        return res.status(404).json({ msg: "utilisateur non trouvé" });
    }

    // Si trouvé, renvoyer l'utilisateur correspondant
    res.json(users[userIndex]);
});