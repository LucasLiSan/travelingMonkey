import express from "express";
import session from "express-session";
import Turistas from "../models/turistas.js";
import GuiasDeTurismo from "../models/guias.js";
import Cidades from "../models/cidades.js";
import PontosTuristicos from "../models/pontos.js";
import CategoriasPontos from "../models/categoriaXponto.js";
import HorarioFuncionamento from "../models/horarioFunc.js";
import HorarioPonto from "../models/horarioXponto.js";
import Atracoes from "../models/atracoes.js";
import Auth from "../middleware/auth.js";

const router = express.Router();

//ROTA BUSCA RAPIDA CIDADES
router.get('/cidades', function(req, res) {
    const user = req.session.userCidade || req.session.userGuia || req.session.userTurista;
    const loggedOut = !user;

    PontosTuristicos.findAll({
        include: {
            model: HorarioFuncionamento,
            as: 'horarios' // Alias para os horários de funcionamento
        }
    }).then(pontos => {
            res.render("cidades", {
                pontos: pontos,
                loggedOut: loggedOut
            });
        });
});

//ROTA BUSCA RAPIDA PONTOS
router.get('/pontos', function(req, res) {
    const user = req.session.userCidade || req.session.userGuia || req.session.userTurista;
    const loggedOut = !user;
    PontosTuristicos.findAll().then(pontos => {
        res.render("pontos", {
            pontos: pontos,
            loggedOut: loggedOut
        });
    });
});

//ROTA BUSCA RAPIDA GUIAS
router.get('/guias', function(req, res) {
    const user = req.session.userCidade || req.session.userGuia || req.session.userTurista;
    const loggedOut = !user;
    PontosTuristicos.findAll().then(pontos => {
        res.render("guias", {
            pontos: pontos,
            loggedOut: loggedOut
        });
    });
});

export default router;