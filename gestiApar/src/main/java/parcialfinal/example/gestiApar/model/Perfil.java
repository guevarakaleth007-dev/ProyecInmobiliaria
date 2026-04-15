package parcialfinal.example.gestiApar.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "PERFIL")
public class Perfil {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_perfil")
    @SequenceGenerator(name = "seq_perfil", sequenceName = "SEQ_PERFIL", allocationSize = 1)
    @Column(name = "IDPERFIL")
    private Long id;

    @Column(name = "NOMBRE")
    private String descripcion;

    public Perfil() {}
}
