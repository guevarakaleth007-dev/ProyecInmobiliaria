package parcialfinal.example.gestiApar.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "FORMAPAGO")
public class FormaPago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDFORMAPAGO")
    private Long id;

    @Column(name = "DESCRIPCION", nullable = false, length = 30)
    private String descripcion;

    public FormaPago() {}
}
