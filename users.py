from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext  # Para hashing de senhas
from database import supabase  # Conexão com o Supabase

router = APIRouter()

# Criar um objeto de contexto para gerenciamento de senhas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Função para hash da senha
def hash_password(password: str):
    return pwd_context.hash(password)

# Função para verificar a senha
def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

# Definir o modelo de dados para o usuário
class UserCreate(BaseModel):
    nome: str  # Nome do usuário
    senha: str  # Senha do usuário
    email: str  # Email do usuário
    tipo_usuario: str  # Tipo de usuário (ex: 'comum', 'admin')

class UserLogin(BaseModel):
    email: str  # Email do usuário
    senha: str  # Senha do usuário

@router.post("/register")
async def create_user(user: UserCreate):
    # Verificar se o usuário já existe (nome de usuário ou email)
    existing_user = supabase.table("usuarios").select("*").eq("email", user.email).execute()

    if existing_user.data:
        raise HTTPException(status_code=400, detail="Usuário já existe!")

    # Gerar o hash da senha antes de salvar no banco de dados
    hashed_password = hash_password(user.senha)

    # Inserir o novo usuário no banco de dados
    try:
        response = supabase.table("usuarios").insert([{
            "nome": user.nome,
            "senha": hashed_password,  # Armazenar a senha hashada
            "email": user.email,
            "tipo_usuario": user.tipo_usuario
        }]).execute()

        # Depuração: Verifique o conteúdo da resposta para garantir que a inserção foi bem-sucedida
        print("Resposta do Supabase:", response)

        # Verificar se a resposta contém os dados esperados
        if response.data:
            return {"message": "Usuário criado com sucesso!"}
        else:
            raise HTTPException(status_code=500, detail="Erro ao criar usuário: " + str(response.error))
    
    except Exception as e:
        # Captura erros inesperados
        print("Erro inesperado ao criar usuário:", e)
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.post("/login")
async def login(user: UserLogin):
    # Verificar se o usuário existe no banco de dados
    existing_user = supabase.table("usuarios").select("*").eq("email", user.email).execute()

    if not existing_user.data:
        raise HTTPException(status_code=400, detail="Usuário não encontrado")

    # Verificar a senha utilizando hash
    if not verify_password(user.senha, existing_user.data[0]["senha"]):
        raise HTTPException(status_code=400, detail="Senha incorreta")

    return {"message": "Login bem-sucedido"}
