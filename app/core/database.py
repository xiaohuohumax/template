from sqlmodel import create_engine

from .args import args
from .config import config

engine = create_engine(config.server.database.url, echo=not args.is_prod)
