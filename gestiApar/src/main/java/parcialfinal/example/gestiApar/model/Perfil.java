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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDPERFIL")
    private Long id;

    @Column(name = "NOMBRE")
    private String descripcion;

    public Perfil() {}
}
