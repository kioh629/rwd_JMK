create table lk_member (
    id char(15)  not null,
    pass char(15) not null,
    name char(10) not null,
    nick char(10) not null,
    hp char(20) not null,
    email char(80),
    primary key(id)
);