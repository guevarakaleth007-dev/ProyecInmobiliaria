package parcialfinal.example.gestiApar.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "DEPARTAMENTO")
public class Departamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDDEPARTAMENTO")
    private Long id;

    @Column(name = "IDPAIS", nullable = false)
    private Long idPais;

    @Column(name = "NOMBRE", nullable = false, length = 100)
    private String nombre;

    public Departamento() {}
}
