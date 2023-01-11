BEGIN;

TRUNCATE "user", build, widget, build_has_widget  RESTART IDENTITY;


INSERT INTO "user"(firstname, lastname, pseudo, email, biography, password) VALUES
    ('jean','bon', 'jambon', 'bacon@cochon.com', 'Bienvenue sur mon espace build', 'monmdp'),
    ('jean1','bon1', 'jambon1', 'bacon1@cochon.com', 'Bienvenue sur mon espace build', 'monmdp'),
    ('jean2','bon2', 'jambon2', 'bacon2@cochon.com', 'Bienvenue sur mon espace build', 'monmdp');

INSERT INTO build(title, user_id) VALUES
    ('monbuild', 1 ),
    ('monbuild1', 1 ),
    ('sonbuild', 2 ),
    ('sonbuild1', 2 ),
    ('leurbuild', 3),
    ('leurbuild1', 3 );

INSERT INTO widget(name, position_x, position_y, build_id) VALUES
    ('calculatrice', 50, 60, 1 ),
    ('todolist', 30, 70, 2 ),
    ('blocknote', 40, 40, 3 ),
    ('calculatrice', 20, 30, 4 ),
    ('todolist', 10, 20, 5 ),
    ('blocknote', 60, 10, 6 );

COMMIT;
-- Adding some tests and seeding for PGsql