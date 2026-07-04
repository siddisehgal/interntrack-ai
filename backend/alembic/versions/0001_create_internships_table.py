"""create internships table

Revision ID: 0001_create_internships_table
Revises: 
Create Date: 2026-06-13 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '0001_create_internships_table'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'internships',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('company', sa.String(), nullable=False),
        sa.Column('role', sa.String(), nullable=False),
        sa.Column('application_date', sa.Date(), nullable=True),
        sa.Column('status', sa.String(), nullable=False, server_default='Applied'),
        sa.Column('notes', sa.Text(), nullable=True),
        sa.Column('deadline', sa.Date(), nullable=True),
    )


def downgrade():
    op.drop_table('internships')
