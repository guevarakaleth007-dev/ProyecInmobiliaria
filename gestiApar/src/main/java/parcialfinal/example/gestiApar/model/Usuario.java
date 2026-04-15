package parcialfinal.example.gestiApar.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "USUARIO")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_usuario")
    @SequenceGenerator(name = "seq_usuario", sequenceName = "SEQ_USUARIO", allocationSize = 1)
    @Column(name = "IDUSUARIO")
    private Long id;

    @Column(name = "USERNAME")
    private String nombreUsuario;

    @Column(name = "PASSWORD")
    private String clave;

    @Column(name = "IDPERSONA")
    private Long idPersona;

    @Column(name = "IDPERFIL")
    private Long idPerfil;

    public Usuario() {}
}
