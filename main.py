from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Importa o middleware para CORS
from pydantic import BaseModel
import bcrypt
from database import supabase
from routers import feedbacks, modulos, users

app = FastAPI()

# Configuração de CORS
origins = [
    "http://localhost:3000",  # Permitir requisições do frontend
    # Se você for hospedar a aplicação em outro lugar, adicione aqui.
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir essas origens
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos os cabeçalhos
)

# Registro de rotas
app.include_router(users.router, prefix="/api/usuarios", tags=["Usuários"])
app.include_router(modulos.router, prefix="/api/modulos", tags=["Módulos"])
app.include_router(feedbacks.router, prefix="/api/feedbacks", tags=["Feedbacks"])

# Modelos de Requisição
class RegisterRequest(BaseModel):
    nome: str  # Nome do usuário
    senha: str  # Senha
    email: str  # E-mail

@app.post("/api/usuarios/register")
async def register(register_request: RegisterRequest):
    try:
        # Verifica se o e-mail já existe
        response = supabase.table("usuarios").select("email").eq("email", register_request.email).execute()
        if response.data:
            raise HTTPException(status_code=400, detail="E-mail já cadastrado")

        # Criptografa a senha
        hashed_password = bcrypt.hashpw(register_request.senha.encode('utf-8'), bcrypt.gensalt())

        # Insere o usuário no banco de dados
        insert_response = supabase.table("usuarios").insert({
            "nome": register_request.nome,
            "email": register_request.email,
            "senha": hashed_password.decode('utf-8'),
            "tipo_usuario": register_request.tipo_usuario
        }).execute()

        print("Resposta de inserção:", insert_response)  # Log para depuração

        if insert_response.status_code == 201:
            return {"status": "Usuário criado com sucesso", "data": insert_response.data}
        else:
            raise HTTPException(status_code=500, detail=f"Erro ao criar usuário no banco de dados: {insert_response}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro no processo de cadastro: {str(e)}")

@app.get("/")
def root():
    return {"mensagem": "API do HelpMeTasy está funcionando!"}
