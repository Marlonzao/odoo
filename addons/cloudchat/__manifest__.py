{
    "name": "CloudChat",
    "version": "19.0.1.0.0",
    "summary": "App esqueleto com uma view vazia no backend",
    "description": "Módulo vazio para Odoo 19: sem modelos/CRUD, só uma tela em branco.",
    "author": "Marlon",
    "license": "LGPL-3",
    "category": "Tools",
    "depends": ["web"],  # precisa do web para client actions
    "data": [
        "views/menu_action.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "cloudchat/static/src/js/empty_client_action.js",
            "cloudchat/static/src/xml/empty_client_action.xml",
        ],
    },
    "images": ["static/description/icon.png"],  # opcional
    "installable": True,
    "application": True,   # aparece em Apps
}
